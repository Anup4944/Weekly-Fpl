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
import type { FPLApiResponse, Manager } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export default function MainTable() {
  const { data, isPending, error, refetch } = useQuery<
    FPLApiResponse,
    Error,
    Manager[]
  >({
    queryKey: ["fplData"],
    queryFn: fetchFplData,
    select: (response) => {
      const managers = response?.results?.new_entries?.results || [];
      return [...managers].sort((a, b) =>
        a.player_first_name.localeCompare(b.player_first_name)
      );
    },
  });

  const totalManagers = data?.length || 0;

  if (error) {
    return (
      <div className="error-message">
        Error fetching data: {error.message}
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetchFplData();
  //       const managers = response?.results?.new_entries?.results || [];

  //       setTotalManagers(managers.length);
  //       const sortedManagers = [...managers].sort((a, b) =>
  //         a.player_first_name.localeCompare(b.player_first_name)
  //       );
  //       setData(sortedManagers);
  //     } catch (error) {
  //       console.log("something went wrong", `${error}`);
  //       setError(
  //         error instanceof Error ? error.message : "Unknown error occurred"
  //       );
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <div>
      {isPending ? (
        <div className="fixed inset-0 flex items-center justify-center  text-muted-foreground">
          Loading managers...
        </div>
      ) : error ? (
        <div className="fixed inset-0 flex items-center justify-center  text-muted-foreground">
          Error: {error}
        </div>
      ) : data ? (
        <div className="rounded-md border shadow-sm">
          {/* <button onClick={() => refetch()}>Refresh</button> */}
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
                  Gameweek winner
                </TableHead>
                <TableHead className="w-[25%] font-semibold text-foreground text-right">
                  Gameweek runner up
                </TableHead>
                <TableHead className="w-[25%] font-semibold text-foreground text-right">
                  MOTH
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
                      <span className="text-muted-foreground">-</span>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      <span className="text-muted-foreground">-</span>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
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
