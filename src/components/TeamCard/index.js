
// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamItem} = props
  const {id, name, teamImageUrl} = teamItem
  return (
    <li className="list-item">
      <Link to={`/team-matches/${id}`} className="link">
        <img src={teamImageUrl} className="image-url" alt={`${name}`} />
        <div>
          <p className="card-heading">{name}</p>
        </div>
      </Link>
    </li>
  )
}

export default TeamCard
