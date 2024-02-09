"use client";

export default function OrderLayout({ children, params }) {
  return (
    <div>
      <h2 className="font-bold text-3xl">
        {/* New Order: {foundCustomer ? foundCustomer.name : "Customer Not Found"} */}
      </h2>
      {children}
    </div>
  );
}
