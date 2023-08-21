import { RowType } from "@/types/types";
import { useState } from "react";
import { Copy, Edit, Trash2 } from "react-feather";

const TableRow = ({ row, index }: { row: RowType; index: number }) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const {
    student: { batch, testTakers },
    test: { name, sessionLink },
    timeline: { reportLink, startDate, endDate },
  } = row!;

  return (
    <>
      <tr className="border text-center" onClick={() => setIsExpand(!isExpand)}>
        <td className="border p-2">{index}</td>
        <td className="border p-2">{batch}</td>
        <td className="border p-2">{name}</td>
        <td className="border p-2">{startDate}</td>
        <td className="border p-2">{endDate}</td>
        <td className="border p-2">{testTakers}</td>
        <td className="border p-2">{reportLink}</td>
        <td className="border p-2">{sessionLink}</td>
        <td className="border p-2 flex gap-2">
          <Copy
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log("copy");
            }}
          />
          <Edit
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log("edit");
            }}
          />
          <Trash2
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log("delete");
            }}
          />
        </td>
      </tr>

      {/* Collabsable Container */}
      {isExpand && (
        <tr className="bg-slate-100">
          <div>Helllo world</div>
        </tr>
      )}
    </>
  );
};

export default TableRow;
