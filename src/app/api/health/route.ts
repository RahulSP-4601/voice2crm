import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "voice2crm",
    timestamp: new Date().toISOString(),
  });
}
