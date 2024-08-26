import { TableError } from "@src/interfaces";

interface ErrorMsgProps {
  msg: TableError[];
}

export const ErrorMsg = ({ msg }: ErrorMsgProps) => {
  return msg.length ? msg.map((error, index) => (
    <div key={index}>
      <dl>
        <dt className="underline font-semibold text-sm">{error.title}</dt>
        <dd className="pl-2 text-sm text-red-500">{error.message}</dd>
      </dl>
    </div>
  )): <div className="pl-2 text-sm">No any error</div>;
};
