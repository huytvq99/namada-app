import { Box, Chip, useTheme, IconButton } from '@mui/material'
import { tokens } from '../../theme'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { SHOW_RECORD_TABLE_OPTION, TRANSACTION_ROUTER } from '../../constant'
import { useQuery } from '@tanstack/react-query'
import { fetchTransaction } from '../../services/transactions'
import { hiddenBlockId } from '../../utils'
import Loader from '../../common/Loader'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { DataGrid } from '@mui/x-data-grid'
import { uniqueId } from '../../utils'
import CustomNoRowsOverlay from '../../components/Table/CustomNoRowsOverlay'

const Transaction = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(() => {
    const pageIndexRaw = Number(searchParams.get('page') || '')
    const index = pageIndexRaw > 0 ? pageIndexRaw : 0

    const pageSizeRaw = Number(searchParams.get('size') || '')
    const pageSize =
      pageSizeRaw > 0 && SHOW_RECORD_TABLE_OPTION.includes(pageSizeRaw)
        ? pageSizeRaw
        : 10
    return {
      index,
      pageSize
    }
  })
  const navigate = useNavigate()

  const {
    data: transactionsData,
    // error,
    isLoading
  } = useQuery({
    queryKey: ['transactionData', page],
    queryFn: () => fetchTransaction(page.index, page.pageSize)
  })
  const rows = transactionsData?.data?.length > 0 ? transactionsData.data : []

  const columns: GridColDef[] = [
    {
      field: 'hash',
      headerName: 'Transaction Hash',
      headerClassName: 'header-cell-first',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: params => {
        return (
          <div
            className="cell-table-page cursor-pointer underline"
            style={{
              color: colors.blueAccent[400],
              textDecoration: 'underline',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            onClick={() => navigate(`/${TRANSACTION_ROUTER}/${params?.value}`)}
          >
            {hiddenBlockId(params?.value || '')}
          </div>
        )
      }
    },
    {
      field: 'block_id',
      headerName: 'Block ID',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: params => (
        <div className="cell-table-page" style={{ fontSize: '16px' }}>
          {hiddenBlockId(params?.value || '')}
        </div>
      )
    },
    {
      field: 'tx_type',
      headerName: 'Type type',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: params => {
        return (
          <div className="cell-table-page" style={{ fontSize: '16px' }}>
            {params?.value}
          </div>
        )
      }
    },
    {
      field: 'tx',
      headerName: 'Status',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: params => {
        return (
          <div className="cell-table-page">
            {params?.value ? (
              <Chip
                label="Success"
                color="default"
                variant="filled"
                size="small"
                sx={{
                  p: 1,
                  fontSize: '16px',
                  background:
                    'linear-gradient(310deg, rgb(45, 206, 137), rgb(45, 206, 204))',
                  color: '#ffffff',
                  fontWeight: '700'
                }}
              />
            ) : (
              <Chip
                label="Failed"
                color="default"
                variant="filled"
                size="small"
                sx={{
                  p: 1,
                  fontSize: '16px',
                  background:
                    'linear-gradient(310deg, rgb(245, 54, 92), rgb(245, 96, 54))',
                  color: '#ffffff',
                  fontWeight: '700'
                }}
              />
            )}
          </div>
        )
      },
      width: 30
    },
    {
      field: 'fee_amount_per_gas_unit',
      headerName: 'Gas used',
      headerAlign: 'left',
      headerClassName: 'header-cell-last',
      align: 'left',
      flex: 1,
      renderCell: params => {
        return (
          <div className="cell-table-page" style={{ fontSize: '16px' }}>
            {params?.value ?? ''}
          </div>
        )
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      headerClassName: 'header-cell-last',
      align: 'center',
      flex: 1,
      width: '1%',
      renderCell: params => {
        return (
          <IconButton
            onClick={() =>
              navigate(`/${TRANSACTION_ROUTER}/${params?.row?.hash}`)
            }
          >
            <AssignmentOutlinedIcon />
          </IconButton>
        )
      }
    }
  ]

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onPageChange = useCallback(
    (newPage: number) => {
      setPage(prev => {
        navigate(
          `/${TRANSACTION_ROUTER}?page=${newPage}&size=${prev.pageSize}`,
          {
            replace: true
          }
        )
        return { ...prev, index: newPage }
      })
    },
    [navigate]
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onPageSizeChange = useCallback(
    (newPageSize: number) => {
      setPage(prev => {
        navigate(
          `/${TRANSACTION_ROUTER}?page=${prev.index}&size=${newPageSize}`,
          {
            replace: true
          }
        )
        return { ...prev, pageSize: newPageSize }
      })
    },
    [navigate]
  )

  return (
    <Box m="20px" sx={{ p: 3, pt: 0 }}>
      <Box
        height="630px"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none'
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300]
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.primary[400],
            borderBottom: 'none',
            borderTopRightRadius: '8px',
            borderTopLeftRadius: '8px'
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400]
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.primary[400],
            borderBottomRightRadius: '8px',
            borderBottomLeftRadius: '8px'
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`
          }
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={row => `${row.block_id}-${uniqueId()}`}
          rowsPerPageOptions={SHOW_RECORD_TABLE_OPTION}
          loading={isLoading}
          page={page.index}
          pageSize={page.pageSize}
          onPageSizeChange={onPageSizeChange}
          onPageChange={onPageChange}
          rowCount={transactionsData?.total || 0}
          paginationMode="server"
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        />
      </Box>
    </Box>
  )
}

export default Transaction
