const PersonalPage: React.FC = () => {
    // const { t } = useTranslation('personal')

    // const queryUserProfile = useQuery({
    //     queryKey: ['userProfile'],
    //     queryFn: () => AuthService.getUserProfile(),
    //     retry: 1
    // })

    // if (queryUserProfile.isPending) {
    //     return (
    //         <Paper sx={{ p: 2 }}>
    //             <Stack spacing={1}>
    //                 <Skeleton width='40%' height={40} />
    //                 <Skeleton width='60%' height={40} />
    //                 <Skeleton width='70%' height={40} />
    //             </Stack>
    //     )
    // }

    // if (queryUserProfile.isError) {
    //     return <Alert severity='error'>{t('error.loadFailed')}</Alert>
    // }

    // const user = queryUserProfile.data

    return <div className='container children-main-layout'>Test personal page</div>
}

export default PersonalPage
