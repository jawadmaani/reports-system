interface ReportsDetailsPageProps {
  params: { reportSlug: string };
}

const ReportsDetailsPage = ({ params }: ReportsDetailsPageProps) => {
  return <h1>Reports Details Page {params.reportSlug}</h1>;
};

export default ReportsDetailsPage;
