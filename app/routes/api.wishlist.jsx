// app/routes/api.wishlist.jsx
import { json } from "@remix-run/node";

// Mock data for wishlist items
const wishlistData = [
  { id: 1, name: "Item 1", description: "Description for item 1" },
  { id: 2, name: "Item 2", description: "Description for item 2" },
];

// Asynchronously fetches wishlist data
export async function fetchWishlistData() {
  return wishlistData;
}

// Loader function to handle GET requests
export async function loader() {
  try {
    const data = await fetchWishlistData();
    return json(data);
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}

export async function action({ request }) {
  const httpMethod = request.method;

  switch (httpMethod) {
    case "POST":
    case "PUT":
    case "PATCH":
    case "DELETE":
      return json({ message: "success", method: httpMethod });
    default:
      return json({ message: "this is something different" });
  }
}

// Optionally, export a default component if you want to render something
// export default function WishlistAPI() {
//   return <div>This is the API route for wishlist data.</div>;
// }
