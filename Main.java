package com.company;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;

import java.io.File;
import java.io.FileReader;
import java.io.RandomAccessFile;
import java.lang.reflect.Type;
import java.util.*;

public class Main {

    private static final Type REVIEW_TYPE = new TypeToken<LinkedList<Message>>() {
    }.getType();

    public static class Message{
        private String id;
        private String message;
        private String author;
        private String timestamp;

        @Override
        public String toString() {
            return "id: " + this.id + " message: " + this.message + " author: " + this.author + " timestamp: " + this.timestamp;
        }

        public LinkedList<Message> fileRead() {
            try {
                Gson gson = new Gson();
                JsonReader reader = new JsonReader(new FileReader("messages.json"));
                LinkedList<Message> messages = gson.fromJson(reader, REVIEW_TYPE);
                reader.close();
                return messages;
            } catch (Exception e) {
                System.out.print(e.toString());
                return null;
            }
        }

        public void writeFile(Message message) {
            Gson gson = new Gson();
            String json = gson.toJson(message);
            try {
                RandomAccessFile raf = new RandomAccessFile("messages.json", "rw");
                String str = raf.readLine();
                if (str != null) {
                    long pos = raf.length() - 1;
                    raf.seek(pos);
                    String s = "," + json + "]";
                    raf.write(s.getBytes());
                } else {
                    long pos = 0;
                    raf.seek(pos);
                    String s = "[" + json + "]";
                    raf.write(s.getBytes());
                }
                raf.close();
            } catch (Exception e) {
                System.out.print(e.toString());
            }

        }

        public void deleteIndex() {
            String id;
            System.out.println("Enter id:");
            Scanner input = new Scanner(System.in);
            id = input.nextLine();
            LinkedList<Message> list = this.fileRead();
            Iterator<Message> it = list.iterator();
            Message message;
            try {
                File file = new File("messages.json");
                if (file.exists() && file.delete()) {
                    while (it.hasNext()) {
                        message = it.next();
                        if (!message.id.equals(id)) {
                            message.writeFile(message);
                        }
                    }
                }
            } catch (Exception e) {
                System.out.println(e.toString());
            }
        }

        public void loading() {
            LinkedList<Message> list = this.fileRead();
            Iterator<Message> it = list.iterator();
            Message message;
            while (it.hasNext()) {
                message = it.next();
                System.out.println(message.toString());
            }

        }

        public void write() {
            UUID id = UUID.randomUUID();
            this.id = id.toString();
            Calendar time;
            System.out.println("write author");
            Scanner inp = new Scanner(System.in);
            author = inp.nextLine();
            System.out.println("write message");
            message = inp.nextLine();
            time = Calendar.getInstance();
            this.timestamp = time.getTime().toString();
            this.writeFile(this);
        }

    }

    public static void main(String[] args) {

        Message m = new Message();
        Scanner inp = new Scanner(System.in);
        String run = "";
        while (!run.equals("end")) {
            System.out.println("What whould you like to do?");
            System.out.println("Write message(1)");
            System.out.println("loading from file(2)");
            System.out.println("delete by id(3))");
            run = inp.nextLine();
            switch (run) {
                case "1": {
                    m.write();
                    break;
                }
                case "2": {
                    m.loading();
                    break;
                }
                case "3": {
                    m.deleteIndex();
                    break;
                }

            }
        }


    }
}






