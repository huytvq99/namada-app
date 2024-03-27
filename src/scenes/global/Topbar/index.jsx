import { Box, IconButton, useTheme, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { tokens } from '../../../theme'
import InputBase from '@mui/material/InputBase'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  BLOCK_ROUTER,
  TRANSACTION_ROUTER,
  VALIDATOR_ROUTER
} from '../../../constant'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomeIcon from '@mui/icons-material/Home'
import './styles.css'

const TopbarV2 = () => {
  const location = useLocation()
  const { pathname } = location

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const [value, setValue] = useState('')

  const breadCrumbs = useMemo(() => {
    if (pathname === '/')
      return [
        {
          name: 'Dashboard',
          link: '/'
        }
      ]
    if (pathname === '/blocks')
      return [
        {
          name: 'Blocks',
          link: '/blocks'
        }
      ]
    if (pathname === '/validators')
      return [
        {
          name: 'Validators',
          link: '/validators'
        }
      ]
    if (pathname === '/transactions')
      return [
        {
          name: 'Transactions',
          link: '/transactions'
        }
      ]

    const splits = pathname.split('/')
    if (splits.length === 3) {
      if (splits[1] === 'blocks')
        return [
          {
            name: 'Blocks',
            link: '/blocks'
          },
          {
            name: 'Block Detail',
            link: '#'
          }
        ]
      if (splits[1] === 'validators')
        return [
          {
            name: 'Validators',
            link: '/validators'
          },
          {
            name: 'Validator Detail',
            link: '#'
          }
        ]
      if (splits[1] === 'transactions')
        return [
          {
            name: 'Transactions',
            link: '/transactions'
          },
          {
            name: 'Transaction Detail',
            link: '#'
          }
        ]
    }
  }, [pathname])

  const handleSubmit = e => {
    e.preventDefault()
    const bh = Number(value)
    if (value?.length === 64) {
      navigate(`/${TRANSACTION_ROUTER}/${value}`)
      setValue('')
    } else if (typeof bh === 'number' && bh) {
      navigate(`/${BLOCK_ROUTER}/${value}`)
      setValue('')
    } else if (value?.length === 40) {
      navigate(`/${VALIDATOR_ROUTER}/${value}`)
      setValue('')
    } else {
      toast(
        "Value search don't match Block Height, Transaction Hash or Validator Address",
        {
          position: 'top-right',
          type: 'error',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: 'colored'
        }
      )
    }
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2} pb={0}>
      {/*  BREADCRUMB */}
      <Box
        display="flex"
        alignItems="center"
        sx={{ ml: 4, width: 'max-content' }}
      >
        <Box display="flex" flexDirection="column" sx={{ mr: 8 }}>
          <Box
            display="flex"
            alignItems="center"
            style={{
              marginBottom: '4px'
            }}
          >
            <Link
              to={'/'}
              className="breadcrumb--link"
              style={{
                color: '#FFFFFF'
              }}
            >
              <HomeIcon fontSize="small" />
            </Link>

            {breadCrumbs?.map((breadcrumb, index) => {
              return (
                <React.Fragment key={index}>
                  <Typography
                    className="breadcrumb--link"
                    style={{
                      color: '#FFFFFF',
                      marginLeft: '8px',
                      marginRight: '8px'
                    }}
                  >
                    /
                  </Typography>
                  <Link
                    to={breadcrumb.link}
                    className="breadcrumb--link"
                    style={{
                      color: '#FFFFFF'
                    }}
                  >
                    {breadcrumb.name}
                  </Link>
                </React.Fragment>
              )
            })}
          </Box>
          <Typography className="breadcrumb--title">
            {breadCrumbs[breadCrumbs.length - 1].name}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" sx={{ mr: 3, p: 1 }}>
        {/* SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="8px"
          sx={{ ml: 3, width: '480px', height: '54px' }}
        >
          <InputBase
            onKeyDown={ev => {
              if (ev.key === 'Enter') {
                handleSubmit(ev)
              }
            }}
            sx={{ ml: 2, flex: 1, fontSize: '16px' }}
            placeholder="Search for Block Height / Transaction Hash / Validator Address or Name"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <IconButton type="button" sx={{ p: 2 }} onClick={handleSubmit}>
            <SearchOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default TopbarV2
