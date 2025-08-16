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
        <div className="min-w-[500px] rounded-md border shadow-sm">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[160px] sm:w-[30%] font-semibold text-foreground">
                  Manager ({data.length})
                </TableHead>
                {/* Show Team Name only on desktop */}
                <TableHead className="w-[160px] sm:w-[30%] font-semibold text-foreground hidden sm:table-cell">
                  Team Name
                </TableHead>
                {/* Show Total Won on all screens (with responsive width) */}
                <TableHead className="w-[120px] sm:w-[20%] font-semibold text-foreground">
                  Total Won
                </TableHead>
                {/* Hide GW and MOTM on mobile */}
                <TableHead className="w-[120px] sm:w-[20%] font-semibold text-foreground hidden sm:table-cell">
                  GW + MOTM
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((team) => (
                <TableRow key={team.entry_name} className="hover:bg-muted/50">
                  <TableCell className="font-medium py-4 w-[160px] sm:w-[30%]">
                    {team.player_name}
                  </TableCell>
                  {/* Hide Team Name on mobile */}
                  <TableCell className="text-muted-foreground w-[160px] sm:w-[30%] hidden sm:table-cell">
                    {team.entry_name}
                  </TableCell>
                  {/* Always show Total Won (replace "-" with actual data if available) */}
                  <TableCell className="text-muted-foreground w-[120px] sm:w-[20%]">
                    {team.total_won || "-"}
                  </TableCell>
                  {/* Hide GW + MOTM on mobile */}
                  <TableCell className="text-muted-foreground w-[120px] sm:w-[20%] hidden sm:table-cell">
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
