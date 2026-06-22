import { searchWikipedia } from "@/lib/scrapers/wikipedia";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export async function GET(request) {
  const query = getParam(request, "q");
  if (!query) return badRequest("Parameter 'q' is required");

  try {
    const data = await searchWikipedia(query);
    return ok(data);
  } catch (error) {
    return fail(error.message);
  }
}
