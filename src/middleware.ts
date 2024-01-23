import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/uploadthing", "/", "/api/fetchMaterials", "/api/fetchMaterialsBySubject", "/api/fetchMaterialsBySubject_alevel", "/api/fetchMaterialsBySubject_gcse"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
