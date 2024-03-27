import { Box, styled, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  fetchLatestSignatureValidator,
  fetchValidator
} from '../../services/validator'
import React, { useCallback, useMemo } from 'react'
import Loader from '../../common/Loader'
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'

export const ValidatorDetail = () => {
  const { validatorAddress } = useParams()

  const {
    data: rawValidatorData,
    error: rawError,
    isLoading: isLoadingRaw
  } = useQuery({
    queryKey: ['rawValidatorData'],
    queryFn: () => fetchValidator()
  })

  const validator = useMemo(() => {
    if (!validatorAddress || !(rawValidatorData?.validators?.length > 0))
      return null
    return rawValidatorData?.validators.find(
      (val: any) => val.hex_address === validatorAddress
    )
  }, [rawValidatorData?.validators, validatorAddress])

  const queryFunctionFetchLatestSig = useCallback(() => {
    if (!validatorAddress) throw new Error('Missing or wrong block id in url')
    return fetchLatestSignatureValidator(validatorAddress)
  }, [validatorAddress])

  const {
    data: latestBlock,
    error: errorLatestBlock,
    isLoading: isLoadingLatestBlock
  } = useQuery({
    queryKey: [`val-latest-${validatorAddress}`],
    queryFn: queryFunctionFetchLatestSig
  })

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(16),
      border: '1px solid #dadde9'
    }
  }))

  if (isLoadingRaw) return <Loader />

  if (rawError || !validator) {
    return (
      <Box m={'20px'} sx={{ p: 3, ml: 3, fontSize: 16 }}>
        Not Found Validator Detail
      </Box>
    )
  }

  return (
    <Box m="20px" sx={{ p: 3, pt: 0 }} className="cards">
      <Box className="card">
        <h2 className="cardHeaderText">Overview</h2>
        <div className="cardItem">
          <span>Validator Address: </span>
          <p>{validator?.hex_address || ''}</p>
        </div>
        <div className="cardItem">
          <span>Moniker: </span>
          <p> {validator?.moniker || ''}</p>
        </div>
        <div className="cardItem">
          <span> Voting Power: </span>
          <p>{validator?.tokens || 0} NAM</p>
        </div>
        <div className="cardItem">
          <span>Voting Percentage: </span>
          <p>{validator?.voting_power_percent || 0}%</p>
        </div>
        <div className="cardItem">
          <span>Operator Address: </span>
          <p>{validator?.operator_address || ''}</p>
        </div>
      </Box>

      <Box className="card">
        <h2 className="cardHeaderText">100 Signed Blocks</h2>
        {isLoadingLatestBlock ? (
          <Loader />
        ) : errorLatestBlock ? (
          <Box mb={'16px'}>
            <Typography
              variant="h3"
              sx={{
                lineHeight: 1.75,
                fontWeight: 600
              }}
            >
              Can't Fetch 100 Latest Blocks
            </Typography>
          </Box>
        ) : (
          <Box>
            <Box mb={'16px'}>
              {latestBlock?.length > 0 &&
                latestBlock.map((item, index) => {
                  return (
                    <HtmlTooltip
                      key={index}
                      title={`Block Number: ${item?.block_number}`}
                      placement="right-start"
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: item?.sign_status
                            ? '#13deb9'
                            : '#FA896B',
                          borderRadius: '4px',
                          margin: '4px',
                          display: 'inline-block'
                        }}
                      />
                    </HtmlTooltip>
                  )
                })}
            </Box>
            <Box display={'flex'} pl={'4px'}>
              <Box
                display={'flex'}
                justifyContent={'center'}
                flexDirection={'row'}
                mr={'32px'}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: '#13deb9',
                    borderRadius: '4px',
                    mr: '8px'
                  }}
                ></Box>
                <Typography variant="h5" color={'#ffffff'} fontWeight={600}>
                  Signed Blocks
                </Typography>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'center'}
                flexDirection={'row'}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: '#FA896B',
                    borderRadius: '4px',
                    mr: '8px'
                  }}
                ></Box>
                <Typography variant="h5" color={'#ffffff'} fontWeight={600}>
                  Missed Block
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}
