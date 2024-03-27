import { Box, Chip, IconButton, useTheme } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import {
  SHOW_RECORD_TABLE_OPTION,
  VALIDATOR_ENDPOINT,
  VALIDATOR_ROUTER
} from '../../constant'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPartValidator, fetchValidator } from '../../services/validator'
import { formatNumber, hiddenBlockId } from '../../utils'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { DataGrid } from '@mui/x-data-grid'
import { uniqueId } from '../../utils'
import CustomNoRowsOverlay from '../../components/Table/CustomNoRowsOverlay'

const Validator = () => {
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
    data: rawValidatorData,
    error: rawError,
    isLoading: isLoadingRaw
  } = useQuery({
    queryKey: ['rawValidatorData'],
    queryFn: () => fetchValidator()
  })

  const {
    data: validatorData,
    error,
    isLoading
  } = useQuery({
    queryKey: ['validatorData', rawValidatorData, page],
    queryFn: () => fetchPartValidator(rawValidatorData, page)
  })

  const rows = validatorData?.length > 0 ? validatorData : []

  function formatToPercentage(num) {
    let percentage = (num * 100).toFixed(2)
    let formattedPercentage = percentage.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    formattedPercentage += '%'
    return formattedPercentage
  }

  if (error || rawError) {
    return <div>Can't Query Validator</div>
  }

  const columns: GridColDef[] = [
    {
      field: 'hex_address',
      headerName: 'Validator address',
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
            onClick={() => navigate(`/${VALIDATOR_ROUTER}/${params?.value}`)}
          >
            {hiddenBlockId(params?.value || '')}
          </div>
        )
      }
    },
    {
      field: 'moniker',
      headerName: 'Moniker',
      headerClassName: 'header-cell-first',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: params => {
        return <div className="cell-table-page">{params?.value || ''}</div>
      }
    },
    {
      field: 'operator_address',
      headerName: 'Operator address',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: params => {
        return (
          <div className="cell-table-page">
            {hiddenBlockId(params?.value || '', 18, true)}
          </div>
        )
      }
    },
    {
      field: 'tokens',
      headerName: 'Voting power',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: params => (
        <div className="cell-table-page">
          {formatNumber(params?.value / 1_000_000)} NAM
        </div>
      )
    },
    {
      field: 'signBlock',
      headerName: 'Commit Signature',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: params => (
        <div className="cell-table-page">{params?.value || 0}</div>
      )
    },
    {
      field: 'voting_power_percent',
      headerName: 'Voting Percentage',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-cell-last',
      flex: 1,
      renderCell: params => {
        const fixedValue =
          typeof params?.value === 'number' ? params.value.toFixed(2) : ''
        return (
          <div className="cell-table-page">
            <Chip
              label={`${fixedValue} %`}
              color="default"
              variant="filled"
              size="small"
              sx={{
                p: 1,
                fontSize: '16px',
                background:
                  'linear-gradient(310deg, rgb(251, 99, 64), rgb(251, 177, 64))',
                color: colors.yellowAccent[700],
                fontWeight: '700'
              }}
            />
          </div>
        )
      }
    },
    {
      field: 'uptime',
      headerName: 'Uptime',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-cell-last',
      flex: 1,
      renderCell: params => {
        return (
          <div className="cell-table-page">
            <Chip
              label={`${formatToPercentage(params.value?.uptime)}`}
              color="default"
              variant="filled"
              size="small"
              sx={{
                p: 1,
                fontSize: '16px',
                background:
                  'linear-gradient(310deg, rgb(17, 113, 239), rgb(17, 205, 239))',
                color: colors.yellowAccent[700],
                fontWeight: '700'
              }}
            />
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
              navigate(`/${VALIDATOR_ROUTER}/${params?.row?.hex_address}`)
            }
          >
            <AssignmentOutlinedIcon />
          </IconButton>
        )
      }
    }
  ]

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onPageChange = useCallback(
    (newPage: number) => {
      setPage(prev => {
        navigate(
          `/${VALIDATOR_ENDPOINT}?page=${newPage}&size=${prev.pageSize}`,
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
          `/${VALIDATOR_ENDPOINT}?page=${prev.index}&size=${newPageSize}`,
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
          loading={isLoadingRaw || isLoading}
          page={page.index}
          pageSize={page.pageSize}
          onPageSizeChange={onPageSizeChange}
          onPageChange={onPageChange}
          rowCount={rawValidatorData?.validators?.length || 0}
          paginationMode="server"
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        />
      </Box>
    </Box>
  )
}

export default Validator
