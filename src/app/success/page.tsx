import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-10">
      <h2 className="text-3xl font-bold text-green-600">
        🎉 Payment Successful!
      </h2>
      <p className="text-lg mt-4">Thank you for your purchase.</p>
      <Link href="/" className="mt-6 text-blue-500 underline">
        Back to Home
      </Link>
    </div>
  );
}
