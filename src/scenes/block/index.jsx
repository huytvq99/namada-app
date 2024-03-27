import { GridColDef } from '@mui/x-data-grid'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { hiddenBlockId } from '../../utils'
import { BLOCK_ROUTER, SHOW_RECORD_TABLE_OPTION } from '../../constant'
import moment from 'moment'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { fetchBlock } from '../../services/block'
import { Box, IconButton, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { DataGrid } from '@mui/x-data-grid'
import { uniqueId } from '../../utils'
import CustomNoRowsOverlay from '../../components/Table/CustomNoRowsOverlay'

const Block = () => {
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

  const {
    data: blockData,
    // error,
    isLoading
  } = useQuery({
    queryKey: ['blockData', page],
    queryFn: () => fetchBlock(page.index, page.pageSize)
  })

  const rows = blockData?.data?.length > 0 ? blockData.data : []

  const navigate = useNavigate()

  const onPageChange = useCallback(
    (newPage: number) => {
      setPage(prev => {
        navigate(`/${BLOCK_ROUTER}?page=${newPage}&size=${prev.pageSize}`, {
          replace: true
        })
        return { ...prev, index: newPage }
      })
    },
    [navigate]
  )

  const onPageSizeChange = useCallback(
    (newPageSize: number) => {
      setPage(prev => {
        navigate(`/${BLOCK_ROUTER}?page=${prev.index}&size=${newPageSize}`, {
          replace: true
        })
        return { ...prev, pageSize: newPageSize }
      })
    },
    [navigate]
  )

  const columns: GridColDef[] = [
    {
      field: 'height',
      headerName: 'Block Height',
      headerAlign: 'left',
      headerClassName: 'header-cell-first',
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
            onClick={() =>
              navigate(`/${BLOCK_ROUTER}/${params?.row?.header?.height}`)
            }
          >
            # {params?.row?.header?.height ?? ''}
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
      field: 'proposer',
      headerName: 'Proposer Address',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: params => {
        return (
          <div className="cell-table-page" style={{ fontSize: '16px' }}>
            {hiddenBlockId(params?.row?.header?.proposer_address, 16)}
          </div>
        )
      }
    },
    {
      field: 'txs',
      headerName: 'Transactions',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: params => {
        return (
          <div className="cell-table-page" style={{ fontSize: '16px' }}>
            {params?.row?.tx_hashes?.length ?? ''}
          </div>
        )
      },
      width: 30
    },
    {
      field: 'time',
      headerName: 'Time',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: params => (
        <div className="cell-table-page" style={{ fontSize: '16px' }}>
          {moment(params?.row?.header?.time).fromNow()}
        </div>
      ),
      width: 50
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
              navigate(`/${BLOCK_ROUTER}/${params?.row?.header?.height}`)
            }
          >
            <AssignmentOutlinedIcon />
          </IconButton>
        )
      }
    }
  ]

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
          rowCount={blockData?.total || 0}
          paginationMode="server"
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        />
      </Box>
    </Box>
  )
}

export default Block
