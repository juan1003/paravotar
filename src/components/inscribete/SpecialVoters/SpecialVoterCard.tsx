import React from "react"
import i18next from "i18next"

import Download from "../../../assets/icons/download.inline.svg"
import List from "../../../assets/icons/list.inline.svg"
import Typography from "../../typography"
import ButtonDropdown from "../../button-dropdown"
import Button from "../../button"
import Link from "../../link"
import Card from "../../card"

type Props = {
  icon: string
  title: string
  summary: string
  deadline: string
  detailsTitle: string
  documents: Array<{ title: string; link: string }>
  onClickRequirements: () => void
}

export default function SpecialVoterCard(voter: Props) {
  return (
    <Card className="text-center">
      <img className="w-12 h-auto m-auto" src={voter.icon} alt="" />
      <Typography
        tag="h4"
        variant="h4"
        className="mt-4 uppercase tracking-wide"
      >
        {voter.title}
      </Typography>
      <Typography tag="p" variant="p" className="mt-3">
        {voter.summary}
      </Typography>
      <Typography tag="p" variant="h4" className="mt-3" weight="semibold">
        {i18next.t("site.special-voters-deadline-text")}
        <br />
        <span className="text-primary">
          <time>{voter.deadline}</time>
        </span>
      </Typography>

      {voter.documents.length > 1 ? (
        <ButtonDropdown
          placeholder={i18next.t("site.absentee-voter-dropdown")}
          options={voter.documents.map(document => ({
            value: i18next.t(document.title),
          }))}
          onSelect={(docTitle: string) => {
            if (docTitle == "Voto Adelantado" || docTitle == "Early Vote")
              docTitle = "site.absentee-voter-dropdown-01"
            else if (
              docTitle == "Voto en el Domicilio" ||
              docTitle == "Vote at Home"
            )
              docTitle = "site.absentee-voter-dropdown-02"
            else if (
              docTitle == "Voto por el Teléfono" ||
              docTitle == "Vote by Phone"
            )
              docTitle = "site.absentee-voter-dropdown-03"
            else docTitle = "none"

            const document = voter.documents.find(doc => doc.title === docTitle)

            // Open download in a new tab.
            window.open(document?.link, "_blank")
          }}
        />
      ) : (
        <Link
          to={voter.documents[0].link}
          target="_blank"
          variant="primary"
          className="mt-6"
        >
          <Download className="mr-1 h-5 w-5 inline-block" />
          {i18next.t("site.early-voter-dropdown")}
        </Link>
      )}
      <Button
        variant="inverse"
        className="mt-4"
        onClick={voter.onClickRequirements}
      >
        <List className="mr-1 h-5 w-5 inline-block" /> {voter.detailsTitle}
      </Button>
    </Card>
  )
}
