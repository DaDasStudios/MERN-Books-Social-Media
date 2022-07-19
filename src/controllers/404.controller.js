import { INVALID_ROUTE } from '../util/jsonStatus'

export default function(req, res) {
    res.status(404).json(INVALID_ROUTE)
}