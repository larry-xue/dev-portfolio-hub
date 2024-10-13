export async function GET() {
  const response = await fetch(`https://developer-portfolio-api.larryxue.dev/`);
  const data = await response.json();

  return new Response(JSON.stringify(data?.results || []), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export const revalidate = 3600;
