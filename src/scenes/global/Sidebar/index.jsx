import React from 'react'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import { NavLink } from 'react-router-dom'
import { Box, IconButton, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined'
import { useLayout } from '../../../contexts/LayoutContext'
import './styles.css'

const Sidebar = () => {
  const { isCollapsed, onToggleCollapse } = useLayout()

  return (
    <Box
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
      backgroundColor={'rgb(17, 28, 68)'}
    >
      <Box
        className="sidebar__menu"
        backgroundColor="rgb(94, 114, 228)"
        style={{
          borderRadius: '50%'
        }}
      >
        <IconButton onClick={onToggleCollapse}>
          {isCollapsed ? (
            <MenuOutlinedIcon fontSize="medium" />
          ) : (
            <MenuOpenOutlinedIcon fontSize="medium" />
          )}
        </IconButton>
      </Box>

      <Box className="sidebar__header">
        <Box className="sidebar__header--logo">
          <img alt="namada" src={`../../../assets/logo1.png`} />
        </Box>
        {!isCollapsed && (
          <Typography
            variant="h3"
            style={{
              fontSize: '26px',
              color: '#ffffff',
              fontWeight: '600'
            }}
          >
            Namada
          </Typography>
        )}
      </Box>
      <div className="sidebar__divider"></div>
      <div className="sidebar__list">
        <NavLink
          to={'/'}
          className="sidebar__list--item"
          style={({ isActive }) => {
            return {
              background: isActive ? 'rgb(52, 71, 103)' : 'transparent',
              color: isActive ? '#ffffff' : '#ffffff',
              fontWeight: isActive ? '600 !important' : '400 !important'
            }
          }}
        >
          <SpaceDashboardOutlinedIcon
            fontSize="large"
            style={{
              fill: 'rgb(94, 114, 228)'
            }}
          />
          {!isCollapsed && <Typography fontSize={'16px'}>Dashboard</Typography>}
        </NavLink>
        <NavLink
          to={'/blocks'}
          className="sidebar__list--item"
          style={({ isActive }) => {
            return {
              background: isActive ? 'rgb(52, 71, 103)' : 'transparent',
              color: isActive ? '#ffffff' : '#ffffff',
              fontWeight: isActive ? '600 !important' : '400 !important'
            }
          }}
        >
          <ViewInArOutlinedIcon
            style={{
              fill: 'rgb(45, 206, 137)'
            }}
            fontSize="large"
          />
          {!isCollapsed && <Typography fontSize={'16px'}>Blocks</Typography>}
        </NavLink>
        <NavLink
          to={'/validators'}
          className="sidebar__list--item"
          style={({ isActive }) => {
            return {
              background: isActive ? 'rgb(52, 71, 103)' : 'transparent',
              color: isActive ? '#ffffff' : '#ffffff',
              fontWeight: isActive ? '600 !important' : '400 !important'
            }
          }}
        >
          <AdminPanelSettingsOutlinedIcon
            style={{
              fill: 'rgb(251, 99, 64)'
            }}
            fontSize="large"
          />
          {!isCollapsed && (
            <Typography fontSize={'16px'}>Validators</Typography>
          )}
        </NavLink>
        <NavLink
          to={'/transactions'}
          className="sidebar__list--item"
          style={({ isActive }) => {
            return {
              background: isActive ? 'rgb(52, 71, 103)' : 'transparent',
              color: isActive ? '#ffffff' : '#ffffff',
              fontWeight: isActive ? '600 !important' : '400 !important'
            }
          }}
        >
          <AccountBalanceWalletOutlinedIcon
            style={{
              fill: 'rgb(17, 205, 239)'
            }}
            fontSize="large"
          />
          {!isCollapsed && (
            <Typography fontSize={'16px'}>Transactions</Typography>
          )}
        </NavLink>
      </div>
    </Box>
  )
}

export default Sidebar
