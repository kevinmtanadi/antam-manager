import { db } from "@/lib/db"
import { product } from "@/lib/db/schema"
import { asc } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET() {
    const weights = await db.selectDistinctOn([product.weight], {
        weight: product.weight
    })
    .from(product)
    .orderBy(asc(product.weight))
    
    if (!weights) {
        return NextResponse.json({message: "Weights not found"}, {status: 404})   
    }
    
    return NextResponse.json(weights, {status: 200})
    
}
