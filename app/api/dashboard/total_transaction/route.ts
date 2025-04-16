import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { transaction } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
    const query = db.select({
        value: sql<number>`count(${transaction.id})`.mapWith(Number)
    }).from(transaction)
    
    const total_transaction = await query
    
     
    return NextResponse.json(total_transaction[0], {status: 200})
}
