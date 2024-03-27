import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import { uniqueId } from '../../utils'
import { SHOW_RECORD_TABLE_OPTION } from '../../constant'
import Loader from '../../common/Loader'

export type TPageDetail = {
  index: number,
  pageSize: number
}

export interface ITableProps extends DataGridProps {
  isLoading: boolean;
  pageDetail: TPageDetail;
  minHeight?: string | number;
}

export const Table = ({
  rows,
  columns,
  isLoading,
  pageDetail,
  onPageSizeChange,
  onPageChange,
  rowCount,
  paginationMode,
  minHeight,
  ...props
}: ITableProps) => {
  return (
    <div className="table-component">
      <DataGrid
        {...props}
        style={{ minHeight: minHeight || 629, fontSize: '16px' }}
        rows={rows}
        columns={columns}
        getRowId={row => `${row.block_id}-${uniqueId()}`}
        autoHeight
        rowsPerPageOptions={SHOW_RECORD_TABLE_OPTION}
        loading={isLoading}
        page={pageDetail.index}
        pageSize={pageDetail.pageSize}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
        rowCount={rowCount}
        components={{ LoadingOverlay: () => <Loader /> }}
        paginationMode={paginationMode}
      />
    </div>
  )
}
