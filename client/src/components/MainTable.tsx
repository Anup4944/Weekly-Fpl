import fetchFplData from "@/actions/fetchData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateToDDMMYYYY } from "@/lib/utils";
import type { ManagerApiResponse } from "@/types/types";
import { useEffect, useState } from "react";

export default function MainTable() {
  const [data, setData] = useState<ManagerApiResponse | null>(null);
  const [totalManagers, setTotalManagers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetchFplData();
        setTotalManagers(response.results.new_entries.results.length);
        const sortedManagers = response.results.new_entries.results.sort(
          (a, b) => a.player_first_name.localeCompare(b.player_first_name)
        );
        setData(sortedManagers);
      } catch (error) {
        console.log("something went wrong", `${error}`);
        setError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          Loading managers...
        </div>
      ) : error ? (
        <div className="text-red-500 flex items-center justify-center">
          Error: {error}
        </div>
      ) : data ? (
        <div className="rounded-md border shadow-sm">
          <Table className="relative">
            <TableHeader className="sticky top-0 bg-background">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[25%] font-semibold text-foreground">
                  Manager ({totalManagers})
                </TableHead>
                <TableHead className="w-[25%] font-semibold text-foreground text-right">
                  Team
                </TableHead>
                <TableHead className="w-[25%] font-semibold text-foreground text-right">
                  Earnings
                </TableHead>
                <TableHead className="w-[25%] font-semibold text-foreground text-right">
                  Joined
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.length ? (
                data.map((team) => (
                  <TableRow
                    key={team.entry_name}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {team.player_first_name} {team.player_last_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {team.entry_name}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {/* {team.total_won ? (
                    <span className="text-green-600 dark:text-green-400">
                      £{(team.total_won / 1000000).toFixed(1)}M
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )} */}
                      <span className="text-muted-foreground">-</span>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {formatDateToDDMMYYYY(team.joined_time)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}
