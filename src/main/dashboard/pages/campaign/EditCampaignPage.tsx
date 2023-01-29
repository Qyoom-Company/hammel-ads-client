import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

type Props = {};

function EditCampaignPage({}: Props) {
    const params = useParams();
    console.log(params.id);
    return <div>EditCampaignPage</div>;
}

export default EditCampaignPage;
