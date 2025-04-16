import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { transaction } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
    const query = db.select({
        value: sql`COALESCE(SUM(${transaction.profit}), 0)::float`,
    }).from(transaction)
    
    const total_stock = await query
    
     
    return NextResponse.json(total_stock[0], {status: 200})
}
