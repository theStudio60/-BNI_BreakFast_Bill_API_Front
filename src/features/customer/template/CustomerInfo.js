
import dateFormat from "dateformat";

export default function CustomerInfo(props){
    const customer = props.customer;

    let customerActive = <span className="badge text-bg-success">Activé</span>
    if(!customer.membership.is_active){
        customerActive = <span className="badge text-bg-danger">Desactivé</span>
    }

    return (
        <div className="column column--lg_3">
          <h3>Info client</h3>

            <p className="column__title">Status client :</p>
            <p className="column__description">{ customerActive }</p>


            <p className="column__title">Crée par :</p>
              <p className="column__description">{customer.created_by.firstname} {customer.created_by.lastname}</p>


            <p className="column__title">Membre depuis :</p>
            <p className="column__description">{dateFormat(customer.membership.membership_at, "dd.mm.yyyy")}</p>

            <p className="column__title">Membre jusque :</p>
            <p className="column__description">{dateFormat(customer.membership.membership_done_at, "dd.mm.yyyy")}</p>


            <div className="text-center">
              <a href="#" className="btn btn-block btn-outline-primary">Edit customer</a>
            </div>
          </div>
        )
}
