import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { CellProps } from "react-table";
import axios from "axios";
import { toastr } from "react-redux-toastr";

export default function ActionsCell<T extends Record<string, unknown>>(
  cell: React.PropsWithChildren<CellProps<T>>
) {
  let patient = useState(cell.data[cell.row.index].patient)[0];
  let visitsCount = patient.visits.length;
  const history = useHistory();

  let toastrConfirmOptions = {
    onOk: async () => {
      try {
        await axios.delete("/api/patient/" + patient.id);
        toastr.success(
          "Deleted",
          "Patient:" + patient.fullName + " Has been deleted"
        );
        setTimeout(() => window.location.reload(), 500);
      } catch (err) {
        toastr.error(
          "Unable to Delete",
          "Patient:" + patient.fullName + " " + err
        );
      }
    }
  };

  let handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let { name } = e.target as HTMLInputElement;
    if (name === "delete") {
      toastr.confirm(
        "Are you sure you want to delete this patient ? this can't be reverse!",
        toastrConfirmOptions
      );
      return;
    }
    history.push({
      pathname: `/main/${name}`,
      state: patient
    });
  };

  return (
    <Fragment>
      <div className="text-left text-md-right">
        <button
          disabled={visitsCount === 0}
          className={` my-1 btn btn-outline-${
            visitsCount === 0 ? "secondary" : "primary"
          } btn-sm`}
          onClick={handleClick}
          name="visits"
        >
          {`${visitsCount} Past Visit${visitsCount === 1 ? "" : "s"}`}
        </button>
        <button
          className="btn btn-outline-primary ml-2  my-1 btn-sm"
          onClick={handleClick}
          name="newVisit"
        >
          New Visit
        </button>
        <button
          className="btn btn-outline-primary ml-2 my-1 btn-sm"
          onClick={handleClick}
          name="history"
        >
          Medical History
        </button>
        <button
          className="btn btn-outline-danger ml-2 my-1 btn-sm"
          onClick={handleClick}
          name="delete"
        >
          Delete
        </button>
      </div>
    </Fragment>
  );
}
