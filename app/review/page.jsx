import { Suspense } from "react";
import ReviewForm from "./ReviewForm";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <ReviewForm />
    </Suspense>
  );
}
