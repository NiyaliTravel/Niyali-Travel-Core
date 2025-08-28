import React from 'react';

interface AdminTableProps {
  data: any[];
  columns: { key: string; header: string }[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export default function AdminTable({ data, columns, onEdit, onDelete }: AdminTableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.header}
            </th>
          ))}
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item[column.key]}
              </td>
            ))}
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button onClick={() => onEdit(item)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                Edit
              </button>
              <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-900">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}