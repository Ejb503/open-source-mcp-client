import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StdErrNotification } from "@/lib/notificationTypes";
import useTheme from "../lib/useTheme";

interface SidebarProps {
  connectionStatus: "disconnected" | "connected" | "error";
  transportType: "sse";
  apikey: string;
  setApikey: (url: string) => void;
  env: Record<string, string>;
  setEnv: (env: Record<string, string>) => void;
  onConnect: () => void;
  stdErrNotifications: StdErrNotification[];
}

const Sidebar = ({
  connectionStatus,
  transportType,
  apikey,
  setApikey,
  onConnect,
  stdErrNotifications,
}: SidebarProps) => {
  const [theme, setTheme] = useTheme();

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <h1 className="ml-2 text-lg font-semibold">
            {theme === "dark" ? <img src="logo.png" /> : <img src="darklogo.png" />}
          </h1>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-auto">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Transport Type</label>
            <Select
            disabled
              value={transportType}            >
              <SelectTrigger>
                <SelectValue placeholder="Select transport type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sse">SSE</SelectItem>
              </SelectContent>
            </Select>
          </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <Input
                placeholder="API Key"
                value={apikey}
                onChange={(e) => setApikey(e.target.value)}
              />
            </div>
          <div className="space-y-2">
            <Button className="w-full" onClick={onConnect}>
              <Play className="w-4 h-4 mr-2" />
              Connect
            </Button>

            <div className="flex items-center justify-center space-x-2 mb-4">
              <div
                className={`w-2 h-2 rounded-full ${
                  connectionStatus === "connected"
                    ? "bg-green-500"
                    : connectionStatus === "error"
                      ? "bg-red-500"
                      : "bg-gray-500"
                }`}
              />
              <span className="text-sm text-gray-600">
                {connectionStatus === "connected"
                  ? "Connected"
                  : connectionStatus === "error"
                    ? "Connection Error"
                    : "Disconnected"}
              </span>
            </div>
            {stdErrNotifications.length > 0 && (
              <>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium">
                    Error output from MCP server
                  </h3>
                  <div className="mt-2 max-h-80 overflow-y-auto">
                    {stdErrNotifications.map((notification, index) => (
                      <div
                        key={index}
                        className="text-sm text-red-500 font-mono py-2 border-b border-gray-200 last:border-b-0"
                      >
                        {notification.params.content}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Select
            value={theme}
            onValueChange={(value: string) =>
              setTheme(value as "system" | "light" | "dark")
            }
          >
            <SelectTrigger className="w-[120px]" id="theme-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
