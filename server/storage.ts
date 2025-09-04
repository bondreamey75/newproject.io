import { type User, type InsertUser, type JournalEntry, type InsertJournalEntry } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry>;
  getJournalEntries(): Promise<JournalEntry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private journalEntries: Map<string, JournalEntry>;

  constructor() {
    this.users = new Map();
    this.journalEntries = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createJournalEntry(insertEntry: InsertJournalEntry): Promise<JournalEntry> {
    const id = randomUUID();
    const journalEntry: JournalEntry = {
      ...insertEntry,
      id,
      createdAt: new Date()
    };
    this.journalEntries.set(id, journalEntry);
    return journalEntry;
  }

  async getJournalEntries(): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
