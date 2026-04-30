import { IndexContact } from "./IndexContact";

export function ContactList({ contacts, onSelect, selectedIds }) {
    return (
        <section className="flex flex-col flex-1 min-h-0">
            <h1 className="text-lg font-light pb-2">Contacts</h1>
            <div className="w-full space-y-3"> 
                {contacts.length > 0 ? (
                    contacts.map((item) => (
                        <IndexContact key={item.id} contact={item} onSelect={onSelect} isSelected={selectedIds.includes(item.id)} />
                    ))
                ) : (
                    <p className="font-light">Go and make some friends!</p>
                )}
            </div>
        </section>
    );
}