import fetchFplData from "@/actions/fetchData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      const managers = response?.results?.standings?.results || [];
      return [...managers].sort(
        (a: Manager, b: Manager) => a.rank_sort - b.rank_sort
      );
    },
  });

  if (isPending) {
    return (
      <div className="fixed inset-0 flex items-center justify-center  text-muted-foreground">
        Loading managers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        Error fetching data: {error.message}
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto pb-2">
      {!data?.length ? (
        <div className="h-24 flex items-center justify-center text-muted-foreground">
          No results found
        </div>
      ) : (
        <div className="min-w-[400px] rounded-md border shadow-sm">
          {/* Reduced from 500px */}
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[120px] sm:w-[10%] font-semibold text-foreground px-2 ">
                  {/* Reduced padding */}
                  Manager ({data.length})
                </TableHead>
                <TableHead className="w-[100px] sm:w-[30%] font-semibold text-foreground hidden sm:table-cell px-2 sm:px-4">
                  Team Name
                </TableHead>
                <TableHead className="w-[80px] sm:w-[10%] font-semibold text-foreground ">
                  {/* Narrower column */}
                  Total Won
                </TableHead>
                <TableHead className="w-[100px] sm:w-[20%] font-semibold text-foreground hidden sm:table-cell px-2 sm:px-4">
                  GW + MOTM
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((team) => (
                <TableRow key={team.entry_name} className="hover:bg-muted/50">
                  <TableCell className="font-medium py-3 w-[120px] sm:w-[10%] px-2 ">
                    {/* Reduced padding */}
                    {team.player_name}
                  </TableCell>
                  <TableCell className="text-muted-foreground w-[100px] sm:w-[30%] hidden sm:table-cell px-2 sm:px-4">
                    {team.entry_name}
                  </TableCell>
                  <TableCell className="text-muted-foreground w-[80px] sm:w-[10%] px-2 ">
                    {/* Narrower column */}
                    {team.total_won || "-"}
                  </TableCell>
                  <TableCell className="text-muted-foreground w-[100px] sm:w-[20%] hidden sm:table-cell px-2 sm:px-4">
                    {team.gw_motm || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
