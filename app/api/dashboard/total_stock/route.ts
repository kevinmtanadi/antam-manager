import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { product, stock } from "@/lib/db/schema";
import { asc, eq, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    let query = db.select({
        value: sql`COALESCE(SUM(${stock.cost}), 0)::float`,
    }).from(stock)
    
    const total_stock = await query
    
    let stockQuery = db.select({
            id: product.id,
            name: product.name,
            total_price: sql`COALESCE(SUM(${stock.cost}), 0)::int`,
    }).from(product)
    .leftJoin(stock, eq(product.id, stock.productId))
      .groupBy(product.id)
      .orderBy(asc(product.weight)) as any;
    const stocks = await stockQuery
    
     
    return NextResponse.json({
        total: total_stock[0],
        stocks: stocks
    }, {status: 200})
}
