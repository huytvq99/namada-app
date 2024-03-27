import { useParams } from 'react-router-dom'
import { useCallback } from 'react'
import { fetchDetailBlockByBlockHeight } from '../../services/block'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../common/Loader'
import { hiddenBlockId } from '../../utils'
import moment from 'moment'
import { Box } from '@mui/material'

export const BlockDetail = () => {
  const { blockHeight } = useParams()

  const queryFunctionFetchDetail = useCallback(() => {
    const numberBlockHeight = Number(blockHeight)
    if (!numberBlockHeight || numberBlockHeight < 0)
      throw new Error('Missing or wrong block height in url')
    return fetchDetailBlockByBlockHeight(numberBlockHeight)
  }, [blockHeight])

  const {
    data: detailBlockData,
    error,
    isLoading
  } = useQuery({
    queryKey: [`block-${blockHeight}`],
    queryFn: queryFunctionFetchDetail
  })

  if (isLoading) return <Loader />

  if (error || !detailBlockData) {
    return (
      <Box m={'20px'} sx={{ p: 3, ml: 3, fontSize: 16 }}>
        Not Found Block Detail
      </Box>
    )
  }

  return (
    <Box m="20px" sx={{ p: 3, pt: 0 }} className="cards">
      <Box className="card">
        <h2 className="cardHeaderText">Overview</h2>
        <div className="cardItem">
          <span>Block Height: </span>
          <p> # {detailBlockData?.header?.height}</p>
        </div>
        <div className="cardItem">
          <span>Transactions: </span>
          <p> {detailBlockData?.tx_hashes?.length || 0}</p>
        </div>
        <div className="cardItem">
          <span>Time: </span>
          <p>
            {' '}
            {moment(detailBlockData?.header?.time).format(
              'DD MMM YYYY hh:mm:ss'
            )}
          </p>
        </div>
        <div className="cardItem">
          <span>Block Hash: </span>
          <p> {detailBlockData?.block_id || ''}</p>
        </div>
        <div className="cardItem">
          <span>Proposer: </span>
          <p> {detailBlockData?.header?.proposer_address}</p>
        </div>
      </Box>

      <Box className="card">
        <h2 className="cardHeaderText">Transactions</h2>
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)'
          }}
        >
          <div className="cardItem">
            <span>Block ID</span>
          </div>
          <div className="cardItem">
            <span>Transaction Type</span>
          </div>
          <div className="cardItem">
            <span>Time</span>
          </div>
        </Box>
        {detailBlockData?.tx_hashes?.map((tx_hash, index) => {
          return (
            <Box
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr)'
              }}
            >
              <div className="cardItem">
                <p>{hiddenBlockId(tx_hash?.hash_id || '')}</p>
              </div>
              <div className="cardItem">
                <p>{tx_hash?.tx_type}</p>
              </div>
              <div className="cardItem">
                <p>{moment(detailBlockData?.header?.time).fromNow()}</p>
              </div>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
