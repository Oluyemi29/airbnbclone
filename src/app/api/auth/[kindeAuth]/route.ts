// import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
// export async function GET(request: object | undefined, { params }: any) {
//   const endpoint = params.kinde;
//   return handleAuth(request, endpoint);
// }

import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = handleAuth();
