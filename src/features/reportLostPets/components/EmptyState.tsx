import { CircleOff } from "lucide-react";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <CircleOff className="h-16 w-16 mb-4" />
    <p className="text-lg font-semibold mb-25">
      No tienes mascotas registradas
    </p>
  </div>
)

export default EmptyState