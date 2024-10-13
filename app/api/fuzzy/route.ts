export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const response = await fetch(`https://developer-portfolio-api.larryxue.dev/fuzzy?name=${searchParams.get("name")}&limit=1000`);
  const { data, pagination } = await response.json();

  return new Response(JSON.stringify({
    results: data.results,
    pagination
  }), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export const fetchCache = "force-no-store"
