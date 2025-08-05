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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchFplData();
        setData(response.results.new_entries.results);
      } catch (error) {
        console.log("something went wrong", `${error}`);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="rounded-md border shadow-sm">
      <Table className="relative">
        <TableHeader className="sticky top-0 bg-background">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[25%] font-semibold text-foreground">
              Manager
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
  );
}
