namespace API.RequestHelpers
{
    public class ProductParams : PaginationParams
    {
        public string OrderBy { get; set; }
        public string SearchTearm { get; set; }
        public string Types { get; set; }
        public string Brands { get; set; }
    }
}
