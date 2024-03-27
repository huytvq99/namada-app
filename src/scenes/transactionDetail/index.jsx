import { useParams } from 'react-router-dom'
import { useCallback } from 'react'
import { fetchDetailBlockByBlockHash } from '../../services/block'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../common/Loader'
import moment from 'moment'
import { Box, Chip } from '@mui/material'
import { fetchDetailTransaction } from '../../services/transactions'

export const TransactionDetail = () => {
  const { tx } = useParams()

  const queryFunctionFetchDetail = useCallback(() => {
    if (!tx) throw new Error('Missing or wrong txh in url')
    return fetchDetailTransaction(tx)
  }, [tx])

  const {
    data: detailTransactionData,
    error,
    isLoading
  } = useQuery({
    queryKey: [`tx-${tx}`],
    queryFn: queryFunctionFetchDetail
  })

  const queryFunctionFetchDetailBlock = useCallback(() => {
    if (!isLoading) {
      const blockId = detailTransactionData?.block_id
      if (!blockId) throw new Error('Missing or wrong block id in url')
      return fetchDetailBlockByBlockHash(blockId)
    }
  }, [detailTransactionData?.block_id, isLoading])

  const { data: detailBlockHash, isLoading: isLoadingBlock } = useQuery({
    queryKey: [`block-hash-${detailTransactionData?.block_id}`],
    queryFn: queryFunctionFetchDetailBlock
  })

  if (isLoading || isLoadingBlock) return <Loader />

  if (error || !detailTransactionData) {
    return (
      <Box m={'20px'} sx={{ p: 3, ml: 3, fontSize: 16 }}>
        Not Found Transaction Detail
      </Box>
    )
  }

  return (
    <Box m="20px" sx={{ p: 3, pt: 0 }} className="cards">
      <Box className="card">
        <h2 className="cardHeaderText">Overview</h2>
        <div className="cardItem">
          <span> Transaction Hash: </span>
          <p>{detailTransactionData?.hash || ''}</p>
        </div>
        <div className="cardItem">
          <span>Block Height: </span>
          <p># {detailBlockHash?.header?.height}</p>
        </div>
        <div className="cardItem">
          <span>Gas Used: </span>
          <p>{detailTransactionData?.gas_limit_multiplier ?? 0}</p>
        </div>
        <div className="cardItem">
          <span>Status: </span>
          {detailTransactionData?.return_code ? (
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
        <div className="cardItem">
          <span>Transaction Type: </span>
          <p>{detailTransactionData?.tx_type ?? ''}</p>
        </div>
        <div className="cardItem">
          <span>Time: </span>
          <p>
            {moment(detailBlockHash?.header?.time).format(
              'DD MMM YYYY hh:mm:ss'
            )}
          </p>
        </div>
        <div className="cardItem">
          <span>Fee: </span>
          <p>{detailTransactionData?.fee_amount_per_gas_unit || 0} NAM</p>
        </div>
      </Box>

      <Box className="card">
        <h2 className="cardHeaderText">Raw Data</h2>
        <Box>
          <Box
            style={{
              flexWrap: 'wrap',
              wordBreak: 'break-word',
              color: '#ffffff',
              fontWeight: 600
            }}
          >
            {JSON.stringify(detailTransactionData, undefined, 2)}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
