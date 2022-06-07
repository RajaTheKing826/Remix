import { Link } from "@remix-run/react";

export default function NestedAdminPage() {
  return (
    <Link prefetch={"intent"} className="text-blue-600" to="new">
      Go to New Page
    </Link>
  );
}
