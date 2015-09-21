/* components may define a static `fetchData` method
   which returns a store-dispatchable action.
   using `redux-thunk` means that these actions may be
   functions like promises. */
export default function fillStore(store, components) {
    return Promise.all(
        components.map(component => {
            component = component && component.WrappedComponent || component;

            if(!component || !component.fillStore) {
                return;
            }

            /* return the promise created by the dispatched action
               in `component.fillStore` */
            return component.fillStore(store);
        })
    );
}
