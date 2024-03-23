import { Grid, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

function GridInputWrapper({ title, disabled, children, mini = false }: {
    title: string,
    disabled?: boolean,
    children: ReactNode,
    mini?: boolean,
}) {
    return (
        <>
            <Grid item xs={mini ? 2 : 4}><StyledTitle disabled={disabled}>{title}</StyledTitle></Grid>
            <Grid item xs={mini ? 10 : 8}>{children}</Grid>
        </>
    )
}

// Input Form Label Text
function StyledTitle({ children, disabled }: { children: ReactNode, disabled?: boolean }) {
    return (
        <Stack justifyContent="center" height="100%">
            <Typography color={disabled ? 'text.disabled' : 'text.primary'}>{children}</Typography>
        </Stack>
    )
}

export { GridInputWrapper }