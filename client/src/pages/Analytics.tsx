import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Eye, Activity, LogOut } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import ProtectedRoute from "@/components/ProtectedRoute";

function AnalyticsDashboard() {
  const { logout } = useAuth();
  const [, setLocation] = useLocation();
  const { data: totalStats } = useQuery({
    queryKey: ["analytics", "total"],
    queryFn: async () => {
      const res = await fetch("/api/analytics/total");
      if (!res.ok) throw new Error("Failed to fetch total stats");
      return res.json();
    },
    refetchInterval: 30000,
  });

  const { data: dailyStats } = useQuery({
    queryKey: ["analytics", "daily"],
    queryFn: async () => {
      const res = await fetch("/api/analytics/daily");
      if (!res.ok) throw new Error("Failed to fetch daily stats");
      return res.json();
    },
    refetchInterval: 30000,
  });

  const { data: recentViews } = useQuery({
    queryKey: ["analytics", "recent"],
    queryFn: async () => {
      const res = await fetch("/api/analytics/recent?limit=10");
      if (!res.ok) throw new Error("Failed to fetch recent views");
      return res.json();
    },
    refetchInterval: 10000,
  });

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Poppins' }}>Analytics Dashboard</h1>
            <p className="text-gray-400">Track your website's visitor statistics</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2 bg-white text-black hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white text-black">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalStats?.totalVisitors || 0}</div>
              <p className="text-xs text-gray-600 mt-1">Unique sessions tracked</p>
            </CardContent>
          </Card>

          <Card className="bg-white text-black">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Eye className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalStats?.totalPageViews || 0}</div>
              <p className="text-xs text-gray-600 mt-1">Total pages viewed</p>
            </CardContent>
          </Card>

          <Card className="bg-white text-black">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Views/Visitor</CardTitle>
              <BarChart3 className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {totalStats?.totalVisitors
                  ? (totalStats.totalPageViews / totalStats.totalVisitors).toFixed(1)
                  : "0"}
              </div>
              <p className="text-xs text-gray-600 mt-1">Pages per session</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white text-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Daily Statistics
              </CardTitle>
              <CardDescription>Visitor activity by day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyStats && dailyStats.length > 0 ? (
                  dailyStats.slice(0, 7).map((stat: any) => (
                    <div key={stat.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{format(new Date(stat.date), "MMM dd, yyyy")}</p>
                        <p className="text-sm text-gray-600">{stat.uniqueVisitors} visitors</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{stat.pageViews}</p>
                        <p className="text-xs text-gray-600">views</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No data available yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white text-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest page views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentViews && recentViews.length > 0 ? (
                  recentViews.map((view: any) => (
                    <div key={view.id} className="flex items-start justify-between border-b pb-2 text-sm">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{view.path}</p>
                        <p className="text-xs text-gray-600">
                          {format(new Date(view.timestamp), "MMM dd, HH:mm:ss")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Analytics() {
  return (
    <ProtectedRoute>
      <AnalyticsDashboard />
    </ProtectedRoute>
  );
}
