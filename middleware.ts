import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// No middleware rules — TinaCloud handles admin auth
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
