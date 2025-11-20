import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-sm w-full border-2">
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-violet-600 animate-spin" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className=" text-lg font-semibold">Loading...</h3>
            <p className="text-sm text-muted-foreground">
              Please wait while we prepare your content
            </p>
          </div>
          <div className="flex gap-2">
            <div
              className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
