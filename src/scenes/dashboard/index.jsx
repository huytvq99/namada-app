import { Box, Typography } from '@mui/material'
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined'
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined'
import { fetchValidator } from '../../services/validator'
import { getLastCommit } from '../../services/block'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'

const Dashboard = () => {
  const { data: rawValidatorData } = useQuery({
    queryKey: ['rawValidatorData'],
    queryFn: () => fetchValidator()
  })

  const { data: lastBlock } = useQuery({
    queryKey: ['lastBlockData'],
    queryFn: () => getLastCommit()
  })

  return (
    <Box m="20px" sx={{ p: 3 }}>
      {/* GRID & CHARTS */}
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="24px">
        <Box
          backgroundColor={'rgb(17, 28, 68)'}
          gap="1rem"
          display="flex"
          alignItems="start"
          justifyContent="space-between"
          borderRadius="1rem"
          p={4}
        >
          <Box>
            <Typography
              style={{
                fontWeight: '600',
                fontSize: '14px',
                lineHeight: '1.5',
                color: 'rgb(255,255,255,0.5)'
              }}
            >
              LATEST BLOCK HEIGHT
            </Typography>
            <Typography
              style={{
                fontWeight: '700',
                fontSize: '1.25rem',
                lineHeight: '1.375',
                color: 'rgb(255, 255, 255)'
              }}
            >
              {lastBlock?.last_commit?.height || 0}
            </Typography>
          </Box>
          <Box
            width={48}
            height={48}
            borderRadius="50%"
            display="flex"
            flex="none"
            alignItems="center"
            justifyContent="center"
            style={{
              background:
                'linear-gradient(310deg, rgb(17, 113, 239), rgb(17, 205, 239))',
              color: 'rgb(255, 255, 255)'
            }}
          >
            <ViewAgendaOutlinedIcon sx={{ color: '#ffffff' }} />
          </Box>
        </Box>

        <Box
          backgroundColor={'rgb(17, 28, 68)'}
          gap="1rem"
          display="flex"
          alignItems="start"
          justifyContent="space-between"
          borderRadius="1rem"
          p={4}
        >
          <Box>
            <Typography
              style={{
                fontWeight: '600',
                fontSize: '14px',
                lineHeight: '1.5',
                color: 'rgb(255,255,255,0.5)'
              }}
            >
              LATEST BLOCK TIME
            </Typography>
            <Typography
              style={{
                fontWeight: '700',
                fontSize: '1.25rem',
                lineHeight: '1.375',
                color: 'rgb(255, 255, 255)'
              }}
            >
              {moment(lastBlock?.header?.time).format('DD MMM YYYY, HH:MM:SS')}
            </Typography>
          </Box>
          <Box
            width={48}
            height={48}
            borderRadius="50%"
            display="flex"
            flex="none"
            alignItems="center"
            justifyContent="center"
            style={{
              background:
                'linear-gradient(310deg, rgb(245, 54, 92), rgb(245, 96, 54))',
              color: 'rgb(255, 255, 255)'
            }}
          >
            <UpdateOutlinedIcon sx={{ color: '#ffffff' }} />
          </Box>
        </Box>

        <Box
          backgroundColor={'rgb(17, 28, 68)'}
          gap="1rem"
          display="flex"
          alignItems="start"
          justifyContent="space-between"
          borderRadius="1rem"
          p={4}
        >
          <Box>
            <Typography
              style={{
                fontWeight: '600',
                fontSize: '14px',
                lineHeight: '1.5',
                color: 'rgb(255,255,255,0.5)'
              }}
            >
              NETWORK
            </Typography>
            <Typography
              style={{
                fontWeight: '700',
                fontSize: '1.25rem',
                lineHeight: '1.375',
                color: 'rgb(255, 255, 255)'
              }}
            >
              {'shielded-expedition.88f17d1d14'}
            </Typography>
          </Box>
          <Box
            width={48}
            height={48}
            borderRadius="50%"
            display="flex"
            flex="none"
            alignItems="center"
            justifyContent="center"
            style={{
              background:
                'linear-gradient(310deg, rgb(45, 206, 137), rgb(45, 206, 204))',
              color: 'rgb(255, 255, 255)'
            }}
          >
            <HubOutlinedIcon sx={{ color: '#ffffff' }} />
          </Box>
        </Box>

        <Box
          backgroundColor={'rgb(17, 28, 68)'}
          gap="1rem"
          display="flex"
          alignItems="start"
          justifyContent="space-between"
          borderRadius="1rem"
          p={4}
        >
          <Box>
            <Typography
              style={{
                fontWeight: '600',
                fontSize: '14px',
                lineHeight: '1.5',
                color: 'rgb(255,255,255,0.5)'
              }}
            >
              VALIDATORS
            </Typography>
            <Typography
              style={{
                fontWeight: '700',
                fontSize: '1.25rem',
                lineHeight: '1.375',
                color: 'rgb(255, 255, 255)'
              }}
            >
              {(rawValidatorData?.validators?.length || 0).toString()}
            </Typography>
          </Box>
          <Box
            width={48}
            height={48}
            borderRadius="50%"
            display="flex"
            flex="none"
            alignItems="center"
            justifyContent="center"
            style={{
              background:
                'linear-gradient(310deg, rgb(251, 99, 64), rgb(251, 177, 64))',
              color: 'rgb(255, 255, 255)'
            }}
          >
            <HowToRegOutlinedIcon sx={{ color: '#ffffff' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
