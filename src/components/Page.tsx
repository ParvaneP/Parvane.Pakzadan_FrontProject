import { Box, Breadcrumbs, Stack, Typography, Link } from '@mui/material'
import { ReactNode } from 'react';

type BreadCrumb = {
  label: string;
  link?: string;
}

type Props = {
  title: string;
  breadcrumb?: Array<BreadCrumb>;
  action?: JSX.Element | ReactNode;
  children: JSX.Element | ReactNode;
}

function Page({ title, breadcrumb, action, children }: Props) {

  return (
    <Box>
      <Box sx={{ width: '100%', py: 3, px: 4 }}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Stack direction={'column'} alignItems={'flex-start'}>
            <Typography variant={'body1'}>{title}</Typography>
            {breadcrumb && Boolean(breadcrumb.length) &&
              <Breadcrumbs aria-label="breadcrumb">
              {breadcrumb.map((value, index) => value.link ?
                  (<Link key={index} underline="hover" color="inherit" href={value.link}>
                    {value.label}
                  </Link>) : (
                    <Typography color="text.primary">{value.label}</Typography>
                  ))}
              </Breadcrumbs>
            }
          </Stack>

          {action}
        </Stack>
      </Box>

      {children}
    </Box>
  );
}

export default Page;